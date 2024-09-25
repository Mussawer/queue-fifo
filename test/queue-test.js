var chai = require("chai");
var Queue = require("../");

var expect = chai.expect;

describe("Queue data structure", function () {
    var queue;

    beforeEach(function () {
        queue = new Queue();
    });

    afterEach(function () {
        queue = null;
    });

    it("instantiates a queue instance", function () {
        expect(queue).to.exist;
    });

    it("is empty when first instantiated", function () {
        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.equal(0);
    });

    it("queues up data at the back of queue", function () {
        queue.enqueue("some test data");
        queue.enqueue("some more test data");
        queue.enqueue("and yet some more...");
        expect(queue.size()).to.equal(3);
    });

    it("dequeues data from the front of the queue", function () {
        queue.enqueue("some test data");
        queue.enqueue("some more test data");
        queue.enqueue("and yet some more...");
        expect(queue.size()).to.equal(3);

        var first = queue.dequeue();
        expect(first).to.equal("some test data");
        expect(queue.size()).to.equal(2);
        expect(queue.dequeue()).to.equal("some more test data");
        expect(queue.size()).to.equal(1);
    });

    it("returns null if dequeue is called on an empty list", function () {
        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.equal(0);
        expect(queue.dequeue()).to.be.null;
    });

    it("peeks at the data at the front of the queue", function () {
        queue.enqueue("some test data");
        queue.enqueue("some more test data");
        queue.enqueue("and yet some more");
        queue.enqueue("and even more data");

        expect(queue.size()).to.equal(4);
        var first = queue.peek();
        expect(first).to.equal("some test data");
        expect(queue.size()).to.equal(4);
    });

    it("returns null if peek is called on an empty list", function () {
        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.equal(0);
        expect(queue.peek()).to.be.null;
    });

    it("clears the queue of all data", function () {
        queue.enqueue("some test data");
        queue.enqueue("some more test data");
        queue.enqueue("and yet some more");
        queue.enqueue("and even more data");

        expect(queue.size()).to.equal(4);
        queue.clear();
        expect(queue.size()).to.equal(0);
        expect(queue.isEmpty()).to.be.true;
    });
    // Edge case test cases for existing functionality

    // Tests FIFO order with mixed enqueue and dequeue operations
    it("maintains FIFO order with mixed enqueue and dequeue operations", function () {
        queue.enqueue("first");
        queue.enqueue("second");
        expect(queue.dequeue()).to.equal("first");
        queue.enqueue("third");
        expect(queue.dequeue()).to.equal("second");
        expect(queue.dequeue()).to.equal("third");
        expect(queue.isEmpty()).to.be.true;
    });

    // Verifies enqueue behavior after the queue has been emptied
    it("handles enqueue after the queue has been emptied", function () {
        queue.enqueue("first");
        queue.dequeue();
        expect(queue.isEmpty()).to.be.true;
        queue.enqueue("new first");
        expect(queue.size()).to.equal(1);
        expect(queue.peek()).to.equal("new first");
    });

    // Checks size consistency after multiple enqueue and dequeue operations
    it("returns correct size after multiple enqueue and dequeue operations", function () {
        var i;
        for (i = 0; i < 1000; i++) {
            queue.enqueue(i);
        }
        expect(queue.size()).to.equal(1000);

        for (i = 0; i < 500; i++) {
            queue.dequeue();
        }
        expect(queue.size()).to.equal(500);

        for (i = 0; i < 200; i++) {
            queue.enqueue(i);
        }
        expect(queue.size()).to.equal(700);
    });

    // Validates order preservation with alternating enqueue and dequeue
    it('maintains correct order when enqueueing and dequeueing alternately', function () {
        queue.enqueue('first');
        queue.enqueue('second');
        expect(queue.dequeue()).to.equal('first');
        queue.enqueue('third');
        expect(queue.dequeue()).to.equal('second');
        queue.enqueue('fourth');
        expect(queue.dequeue()).to.equal('third');
        expect(queue.dequeue()).to.equal('fourth');
        expect(queue.isEmpty()).to.be.true;
    });    

    // Tests enqueue functionality after clearing the queue
    it('handles enqueue after clearing the queue', function () {
        queue.enqueue('first');
        queue.enqueue('second');
        queue.clear();
        expect(queue.isEmpty()).to.be.true;
        queue.enqueue('new first');
        expect(queue.size()).to.equal(1);
        expect(queue.peek()).to.equal('new first');
    });
 
    // Verifies size and order maintenance with duplicate values
    it('returns correct size and maintains order with duplicate values', function () {
        queue.enqueue('duplicate');
        queue.enqueue('duplicate');
        queue.enqueue('duplicate');
        expect(queue.size()).to.equal(3);
        expect(queue.dequeue()).to.equal('duplicate');
        expect(queue.dequeue()).to.equal('duplicate');
        expect(queue.dequeue()).to.equal('duplicate');
        expect(queue.isEmpty()).to.be.true;
    });
 
    // Checks behavior with a large number of enqueue and dequeue operations
    it('handles a large number of enqueue and dequeue operations', function () {
        for (var i = 0; i < 10000; i++) {
            queue.enqueue(i);
        }
        expect(queue.size()).to.equal(10000);
        
        for (var j = 0; j < 10000; j++) {
            expect(queue.dequeue()).to.equal(j);
        }
        expect(queue.isEmpty()).to.be.true;
    });
 
    // Tests peek functionality after multiple enqueue and dequeue operations
    it('correctly handles peek after multiple enqueue and dequeue operations', function () {
        queue.enqueue('first');
        queue.enqueue('second');
        queue.dequeue();
        queue.enqueue('third');
        expect(queue.peek()).to.equal('second');
        queue.dequeue();
        expect(queue.peek()).to.equal('third');
    });
 
    // Verifies behavior when peeking or dequeueing from a cleared queue
    it('returns null when peeking or dequeueing from a cleared queue', function () {
        queue.enqueue('item');
        queue.clear();
        expect(queue.peek()).to.be.null;
        expect(queue.dequeue()).to.be.null;
    });
 
    // Tests behavior when enqueueing null or undefined values
    it('maintains correct behavior when enqueueing null or undefined values', function () {
        queue.enqueue(null);
        queue.enqueue(undefined);
        expect(queue.size()).to.equal(2);
        expect(queue.dequeue()).to.be.null;
        expect(queue.dequeue()).to.be.undefined;
    });
  
    // Checks toArray() method after multiple operations
    it('correctly converts to array after multiple operations', function () {
        queue.enqueue('first');
        queue.enqueue('second');
        queue.dequeue();
        queue.enqueue('third');
        var arr = queue.toArray();
        expect(arr).to.deep.equal(['second', 'third']);
    });

    // Verifies FIFO order maintenance with mixed data types
    it('maintains FIFO order with mixed data types', function () {
        queue.enqueue(1);
        queue.enqueue('two');
        queue.enqueue({ three: 3 });
        queue.enqueue([4]);
        queue.enqueue(null);
        queue.enqueue(undefined);
    
        expect(queue.dequeue()).to.equal(1);
        expect(queue.dequeue()).to.equal('two');
        expect(queue.dequeue()).to.deep.equal({ three: 3 });
        expect(queue.dequeue()).to.deep.equal([4]);
        expect(queue.dequeue()).to.be.null;
        expect(queue.dequeue()).to.be.undefined;
        expect(queue.isEmpty()).to.be.true;
    });
   
    // Tests enqueueing the result of a dequeue operation
    it('correctly handles enqueueing the result of a dequeue operation', function () {
        queue.enqueue('first');
        queue.enqueue('second');
        var dequeued = queue.dequeue();
        queue.enqueue(dequeued);
        
        expect(queue.dequeue()).to.equal('second');
        expect(queue.dequeue()).to.equal('first');
        expect(queue.isEmpty()).to.be.true;
    });
  
    // Checks state consistency after multiple clear operations
    it('maintains correct state after multiple clear operations', function () {
        queue.enqueue('item');
        queue.clear();
        queue.clear(); // Multiple clear calls
        queue.enqueue('new item');
        expect(queue.size()).to.equal(1);
        expect(queue.peek()).to.equal('new item');
    });
 
    // Tests behavior with alternating enqueue, dequeue, and peek operations
    it('handles alternating enqueue, dequeue, and peek operations', function () {
        for (var i = 0; i < 100; i++) {
            queue.enqueue(i);
            if (i % 2 === 0) {
                expect(queue.peek()).to.equal(Math.floor(i / 2));
                expect(queue.dequeue()).to.equal(Math.floor(i / 2));
            }
        }
        expect(queue.size()).to.equal(50);
    });
 
    // Verifies enqueueing and dequeueing of functions
    it('correctly handles enqueueing and dequeueing functions', function () {
        var func1 = function () { return 'func1'; };
        var func2 = function () { return 'func2'; };
        
        queue.enqueue(func1);
        queue.enqueue(func2);
        
        var dequeuedFunc1 = queue.dequeue();
        var dequeuedFunc2 = queue.dequeue();
        
        expect(dequeuedFunc1()).to.equal('func1');
        expect(dequeuedFunc2()).to.equal('func2');
    });
 
    // Tests queue consistency when reaching maximum call stack size
    it('maintains consistency when reaching maximum call stack size', function () {
        var recursiveEnqueue = function (depth) {
            if (depth <= 0) return;
            queue.enqueue(depth);
            recursiveEnqueue(depth - 1);
        };
        
        try {
            recursiveEnqueue(1000000); // This should cause a stack overflow
        } catch (e) {
            // Stack overflow occurred
        }
        
        // Check if the queue is still in a valid state
        expect(queue.size()).to.be.above(0);
        expect(queue.peek()).to.be.a('number');
    });

    beforeEach(function () {
        queue = new Queue();
    });

    // Checks order and size with large number of elements
    it('should maintain correct order when enqueueing and dequeueing large numbers of elements', function () {
        var numElements = 100000;
        var i;
        for (i = 0; i < numElements; i++) {
            queue.enqueue(i);
        }
        expect(queue.size()).to.equal(numElements);
        for (i = 0; i < numElements; i++) {
            expect(queue.dequeue()).to.equal(i);
        }
        expect(queue.isEmpty()).to.be.true;
    });

    // Tests handling of undefined values
    it('should handle enqueueing and dequeueing undefined values', function () {
        queue.enqueue(undefined);
        expect(queue.size()).to.equal(1);
        expect(queue.dequeue()).to.be.undefined;
        expect(queue.isEmpty()).to.be.true;
    });
 
    // Verifies enqueue behavior after dequeueing all elements
    it('should correctly handle enqueueing after dequeueing all elements', function () {
        queue.enqueue('a');
        queue.dequeue();
        queue.enqueue('b');
        expect(queue.size()).to.equal(1);
        expect(queue.dequeue()).to.equal('b');
    });
  
    // Tests behavior with null values
    it('should maintain correct behavior when enqueueing null values', function () {
        queue.enqueue(null);
        queue.enqueue('a');
        expect(queue.size()).to.equal(2);
        expect(queue.dequeue()).to.be.null;
        expect(queue.dequeue()).to.equal('a');
    });
 
    // Checks alternating enqueue and dequeue operations
    it('should handle alternating enqueue and dequeue operations correctly', function () {
        var i;
        for (i = 0; i < 1000; i++) {
            queue.enqueue(i);
            if (i % 2 === 0) {
                expect(queue.dequeue()).to.equal(i / 2);
            }
        }
        expect(queue.size()).to.equal(500);
    });

    // Verifies peek functionality in various scenarios
    it('should correctly implement peek functionality', function () {
        queue.enqueue('a');
        queue.enqueue('b');
        expect(queue.peek()).to.equal('a');
        queue.dequeue();
        expect(queue.peek()).to.equal('b');
        queue.dequeue();
        expect(queue.peek()).to.be.null;
    });

    // Tests enqueueing a dequeued item
    it('should handle enqueueing the result of a dequeue operation', function () {
        queue.enqueue('a');
        queue.enqueue('b');
        var item = queue.dequeue();
        queue.enqueue(item);
        expect(queue.dequeue()).to.equal('b');
        expect(queue.dequeue()).to.equal('a');
    });

    // Checks state after multiple clear operations
    it('should maintain correct state after multiple clear operations', function () {
        queue.enqueue('a');
        queue.clear();
        queue.clear();
        queue.enqueue('b');
        expect(queue.size()).to.equal(1);
        expect(queue.peek()).to.equal('b');
    });
});

describe('Queue reverse functionality', function () {
    var queue;

    beforeEach(function () {
        queue = new Queue();
    });

    // Tests basic reversal of queue elements
    it('should reverse the order of elements in the queue', function () {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        queue.reverse();
        expect(queue.dequeue()).to.equal('c');
        expect(queue.dequeue()).to.equal('b');
        expect(queue.dequeue()).to.equal('a');
        expect(queue.isEmpty()).to.be.true;
    });

    // Verifies that reversing an empty queue doesn't cause errors
    it('should handle reversing an empty queue', function () {
        queue.reverse();
        expect(queue.isEmpty()).to.be.true;
    });

    // Checks reversal behavior with a single element
    it('should handle reversing a queue with one element', function () {
        queue.enqueue('a');
        queue.reverse();
        expect(queue.dequeue()).to.equal('a');
        expect(queue.isEmpty()).to.be.true;
    });

    // Ensures that reversing doesn't change the queue size
    it('should maintain correct size after reversing', function () {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        queue.reverse();
        expect(queue.size()).to.equal(3);
    });

    // Verifies that multiple reversals return the queue to its original state
    it('should handle multiple reverse operations', function () {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
        queue.reverse();
        queue.reverse();
        expect(queue.dequeue()).to.equal('a');
        expect(queue.dequeue()).to.equal('b');
        expect(queue.dequeue()).to.equal('c');
        expect(queue.isEmpty()).to.be.true;
    });

    // Tests reversal of a large number of elements for performance and correctness
    it('should correctly reverse a large number of elements', function () {
        var i;
        var numElements = 1000;
        for (i = 0; i < numElements; i++) {
            queue.enqueue(i);
        }
        queue.reverse();
        for (i = numElements - 1; i >= 0; i--) {
            expect(queue.dequeue()).to.equal(i);
        }
        expect(queue.isEmpty()).to.be.true;
    });
});