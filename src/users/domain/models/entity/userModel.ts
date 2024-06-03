import { Schema } from "mongoose";

export const userModel = new Schema(
    {
        id: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    { timestamps: true }
);

export const carModel = new Schema(
    {
        id: { type: String, required: true },
        registration_id: { type: String, required: true, unique: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        color: { type: String, required: true },
        seats: { type: Number, required: true },
    },
    { timestamps: true }
);

export const rideModel = new Schema(
    {
        id: { type: String, required: true, unique: true },
        availableSeats: { type: Number, required: true },
        departureTime: { type: Date, required: true },
        origin: { type: String, required: true },
        destination: { type: String, required: true },
        price: { type: Number, required: true },
        driverId: { type: String, required: true },
        carId: { type: String, required: true },
        currentLocation: { type: Object, required: true },
    },
    { timestamps: true }
);

export const bookingRideModel = new Schema(
    {
        id: { type: String, required: true, unique: true },
        rideId: { type: String, required: true },
        passengerId: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

export const paymentModel = new Schema(
    {
        id: { type: String, required: true, unique: true },
        bookingId: { type: String, required: true },
        paymentStatus: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        paymentDate: { type: Date, required: true },
    },
    { timestamps: true }
);

export const reviewModel = new Schema(
    {
        id: { type: String, required: true, unique: true },
        rideId: { type: String, required: true },
        reviewerId: { type: String, required: true },
        reviewerRating: { type: Number, required: true },
        reviewComment: { type: String, required: true },
        reviewDate: { type: Date, required: true },
    },
    { timestamps: true }
);
