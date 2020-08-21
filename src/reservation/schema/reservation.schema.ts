import * as mongoose from 'mongoose';
import { ReservationStatus, ReservationType } from '../models/reservation.model';

export const ReservationSchema = new mongoose.Schema({
    estimatedAtTableAt: {
        type: Date,
        required: false
    },
    pax: {
        type: Number,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: String,
    phoneNumber: {
        type: String,
        required: false
    },
    status: {
        type: ReservationStatus,
        default: ReservationStatus.IN_BOOKING
    },
    tables: [Number],
    type: {
        type: ReservationType,
        default: ReservationType.PRE_RESERVATION
    },
},
    {
        timestamps: true
    }
);