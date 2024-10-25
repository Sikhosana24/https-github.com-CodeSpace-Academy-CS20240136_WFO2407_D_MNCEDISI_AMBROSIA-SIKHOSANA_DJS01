/**
 * Debugging Guide
 * 1. Make the code more readable
 * 2. Pick up calculation errors
 * 3. Make these calculations robust such that the calculation does not give an incorrect result, it throws an error to the user if something has gone wrong (parameter used with an incorrect unit of measurement, etc)
 */

// Given Parameters
const vel = 10000; // velocity (km/h)
const acc = 3; // acceleration (m/s^2)
const time = 3600; // time in seconds (1 hour)
const d = 0; // initial distance (km)
const fuel = 5000; // remaining fuel (kg)
const fbr = 0.5; // fuel burn rate (kg/s)

// Helper function to convert acceleration from m/s² to km/h²
const convertAccToKmh2 = (acc) => acc * 12960; // (3.6^2)

// Corrected Function to calculate new velocity with proper unit handling
const calcNewVel = (vel, acc, time) => {
    // Check for valid inputs
    if (typeof vel !== 'number' || typeof acc !== 'number' || typeof time !== 'number') {
        throw new Error("Invalid input type: vel, acc, and time must be numbers.");
    }

    // Convert acceleration from m/s² to km/h²
    const accKmh2 = convertAccToKmh2(acc);

    // Calculate new velocity: v_new = v_initial + (acc * time)
    return vel + (accKmh2 * (time / 3600)); // Time converted from seconds to hours
};

// Function to calculate new distance
const calcNewDist = (vel, time, d) => {
    if (typeof vel !== 'number' || typeof time !== 'number' || typeof d !== 'number') {
        throw new Error("Invalid input type: vel, time, and distance must be numbers.");
    }
    
    const timeInHours = time / 3600; // Convert time to hours for consistency with km/h
    return d + (vel * timeInHours);
};

// Function to calculate remaining fuel
const calcRemainingFuel = (fuel, fbr, time) => {
    if (typeof fuel !== 'number' || typeof fbr !== 'number' || typeof time !== 'number') {
        throw new Error("Invalid input type: fuel, fbr, and time must be numbers.");
    }

    const remainingFuel = fuel - (fbr * time); // Fuel used = fuel burn rate * time
    if (remainingFuel < 0) {
        throw new Error("Fuel depleted.");
    }
    return remainingFuel;
};

// Perform calculations
try {
    const d2 = calcNewDist(vel, time, d); // Calculate new distance
    const rf = calcRemainingFuel(fuel, fbr, time); // Calculate remaining fuel
    const vel2 = calcNewVel(vel, acc, time); // Calculate new velocity

    // Output the corrected results
    console.log(`Corrected New Velocity: ${vel2.toFixed(2)} km/h`);
    console.log(`Corrected New Distance: ${d2.toFixed(2)} km`);
    console.log(`Corrected Remaining Fuel: ${rf.toFixed(2)} kg`);
} catch (error) {
    console.error(error.message);
}
