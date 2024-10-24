function findSecondLargest(arr) {
    if (arr.length < 2) {
        return "Array should have at least two elements.";
    }

    let first = -Infinity;
    let second = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > first) {
            //Exchange values
            second = first;
            first = arr[i];
        } else if (arr[i] > second && arr[i] !== first) {
            // Update second if current is between first and second
            second = arr[i]; 
        }
    }

    // Check if all elements are the same
    if (second === -Infinity) {
        return "All numbers are equal.";
    }

    return second; // Return the second largest number
}

//use cases
const arr=[6,13,22,18,0,3,45,57,5,12]
console.log(findSecondLargest(arr)) 

const arr1 = [1,1,1,1,1,1];
console.log(findSecondLargest(arr1)); 

const arr2 = [4,3,2,1];
console.log(findSecondLargest(arr2)); 

const arr3 = [-99999,-89878, -1, -2];
console.log(findSecondLargest(arr3)); 

const arr4 = [1,20,200,2000];
console.log(findSecondLargest(arr4)); 

const arr5=[]
console.log(findSecondLargest(arr5))
