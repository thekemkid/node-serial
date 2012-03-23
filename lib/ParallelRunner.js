
function ParallelRunner() {

    var self = this

    var chainItems = []

    this.add = function() {
        var func = arguments[0]

        var args = []
        for(var i=1; i < arguments.length ; i++) {
            args.push(arguments[i])
        }

        chainItems.push(new ChainItem(func, args))

        return this
    }

    this.run = function(done) {

        var counter = chainItems.length;
        var results = {};
        function makeCallback (index) {
            return function () {

                counter --

                var result = []

                // we use the arguments object here because some callbacks
                // in Node pass in multiple arguments as result.
                for (var i = 0 ; i < arguments.length ; i++) {
                    result.push(arguments[i])
                }

                results[index] = result

                if (counter === 0) {

                    if(done) {
                        done(results)
                    }
                }
            }
        }

        for (var i = 0 ; i < chainItems.length ; i++) {
            chainItems[i].run(makeCallback(i))
        }
    }


    var results = []

    function ChainItem(func, args) {

        this.args = args

        this.func = func

        var self = this

        this.run = function(callback) {

            if(self.args) {

                self.args.push(callback)
                func.apply(this, self.args)

            } else {

                func(callback)

            }
        }
    }
}

module.exports = ParallelRunner
