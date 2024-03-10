const { Day } = require('../models')

const dateData = [
    {
        month: 3,
        day: 4,
        week: 10,
        weekday: "Monday",
        year: 2024,
    },
    {
        month: 3,
        day: 5,
        week: 10,
        weekday: "Tuesday",
        year: 2024,
    },
    {
        month: 3,
        day: 6,
        week: 10,
        weekday: "Wednesday",
        year: 2024,
    },
    {
        month: 3,
        day: 7,
        week: 10,
        weekday: "Thursday",
        year: 2024,
    },
    {
        month: 3,
        day: 8,
        week: 10,
        weekday: "Friday",
        year: 2024,
    },
    {
        month: 3,
        day: 9,
        week: 10,
        weekday: "Saturday",
        year: 2024,
    },
    {
        month: 3,
        day: 10,
        week: 10,
        weekday: "Sunday",
        year: 2024,
    },
        {
        month: 3,
        day: 11,
        week: 11,
        weekday: "Monday",
        year: 2024,
    },
    {
        month: 3,
        day: 12,
        week: 11,
        weekday: "Tuesday",
        year: 2024,
    },
    {
        month: 3,
        day: 13,
        week: 11,
        weekday: "Wednesday",
        year: 2024,
    },
    {
        month: 3,
        day: 14,
        week: 11,
        weekday: "Thursday",
        year: 2024,
    },
    {
        month: 3,
        day: 15,
        week: 11,
        weekday: "Friday",
        year: 2024,
    },
    {
        month: 3,
        day: 16,
        week: 11,
        weekday: "Saturday",
        year: 2024,
    },
    {
        month: 3,
        day: 17,
        week: 11,
        weekday: "Sunday",
        year: 2024,
    },
];

const seedDate = () => Day.bulkCreate(dateData);

module.exports = seedDate;