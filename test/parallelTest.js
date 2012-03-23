var ParallelRunner = require("../index").ParallelRunner

var should = require("should")

describe("When running tasks parallely", function() {
    it("", function(done) {
        var r = new ParallelRunner()

        var list = []
        var numCallback = 10

        var func = function(i, next) {

            setTimeout(function() {

                list[i] = i
                next(i)

            }, 20-i)
        }

        for(var i = 0 ; i < numCallback ; i++) {

            r.add(func, i)

        }

        r.run(function(results) {

            list.length.should.equal(numCallback)

            for(var i=0 ; i < numCallback ; i++) {

                list[i].should.equal(i)

            }

            for(var j = 0 ; j < numCallback ; j++) {

                results[j][0].should.equal(j)

            }

            done();
        });

    });
});
