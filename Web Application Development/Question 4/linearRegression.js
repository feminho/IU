//force strict mode which helps catch common coding errors and "unsafe" actions such as defining variables without var, let, or const
'use strict';


//As I decided to make it as a prototype object LR will act as namespace for organizing code. It's not really needed, it's just a personal preference 
if (typeof (LR) === "undefined") { //
    LR = { __namespace: true };
}

//Definition of a construct function
LR.LinearRegression = function () {
    var _self = this; //store this in "_self" variable to use in inner functions

    // Method to calculate the mean of an array
    _self.mean = function(arr) {
        let sum = 0;
        //Iterates through the array to calculate the sum of its elements
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i]; 
        }
        return sum / arr.length; // returns the average.
    };

    // Method to calculate the sum of the product of two arrays
    _self.sumProduct = function(arr1, arr2) {
        let sum = 0;
        for (let i = 0; i < arr1.length; i++) { //the product of the two arrays must use the corresponding elements on the operation.
            sum += arr1[i] * arr2[i];
        }
        return sum;
    };

    // Method to perform simple linear regression
    _self.calculate = function(x, y) {
        // Calculate means of x and y
        const xMean = _self.mean(x);
        const yMean = _self.mean(y);
        
        /*
        * The formula for the slope (m) is derived from the relationship between the dependent variable (y) and the independent variable (x).
        * The slope represents the change in the dependent variable for a unit change in the independent variable.
        * The formula is: Slope = ∑(xi​−xˉ)(yi​−yˉ​) / ∑(xi​−xˉ)²
        */

        // Calculate the coefficients for slope formula
        const numerator = _self.sumProduct(
            x.map(xi => xi - xMean), // Deviation of each x from the mean of x
            y.map(yi => yi - yMean) // Deviation of each y from the mean of y
        );

        const denominator = _self.sumProduct(
            x.map(xi => xi - xMean), // Deviation of each x from the mean of x squared
            x.map(xi => xi - xMean)  
        );

        //finally, we calculate the slope
        const slope = numerator / denominator;

        /*
        * The intercept represents the expected value of y when x is zero.
        * It adjusts the position of the line vertically to best fit the data points.
        */
        const intercept = yMean - slope * xMean;

        return { slope, intercept };
    };

    /* Method to predict y values using the linear regression model
     * the formula to predict yy for a given xx using the regression line is:
     * predict Y = (mx+b) 
     * m → Slope
     * x → Independent variable
     * b → Intercept 
     */
    _self.predict = function(x, slope, intercept) {
        return x.map(xi => slope * xi + intercept);
    };
};

// Usage example

//Creates a new instance of the LinearRegression object.
var linearRegression = new LR.LinearRegression(); 

// Example data: hours studied vs. exam scores
const hoursStudied = [1, 2, 3, 4, 5];
const examScores = [60, 62, 65, 70, 72];

// Performs linear regression on the example data and destructures the slope and intercept from the result.
const { slope, intercept } = linearRegression.calculate(hoursStudied, examScores);

// Output the results
console.log(`Slope: ${slope}`);
console.log(`Intercept: ${intercept}`);

// Predict exam scores for given hours studied
const predictedScores = linearRegression.predict(hoursStudied, slope, intercept);

// Output the predicted scores
console.log("Predicted scores:", predictedScores);