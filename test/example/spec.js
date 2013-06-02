

var assert = function(expr, msg) {
  if (!expr) throw new Error(msg || 'failed');
}


describe("Suite 1", function() {
  describe("Sub suite 1.1", function() {
    it("is true", function() {
      assert(true);
    });
  });
  describe("Sub suite 1.2", function() {
    it("is true 2", function() {
      assert(true);
    });
    it("is true 3", function() {
      assert(true);
    });
    it("is true 4 slow", function(done) {
      setTimeout(function(){
        assert(true);
        done()
      }, 100);
    });
  });
});

describe("Suite 2", function() {
  describe("Sub suite 2.1", function() {
    it("is true", function() {
      assert(true);
    });
  });
  describe("Sub suite 2.2", function() {
    it("is true 2", function() {
      assert(true);
    });
    it("is false 3", function() {
      assert(false);
    });
  });
});

describe("Suite 3", function() {
  describe("Sub suite 3.1", function() {
    it("is false", function() {
      assert(false);
    });
    it("is false 2", function() {
      assert(false);
    });
  });
});


