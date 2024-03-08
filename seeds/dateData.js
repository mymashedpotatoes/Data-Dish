const { Day } = require('../models')

const dateData = [
    {
        month: 3,
        day: 4,
        week: 10,
        weekday: 1,
        year: 2024,
    },
    {
        month: 3,
        day: 5,
        week: 10,
        weekday: 2,
        year: 2024,
    },
    {
        month: 3,
        day: 6,
        week: 10,
        weekday: 3,
        year: 2024,
    },
    {
        month: 3,
        day: 7,
        week: 10,
        weekday: 4,
        year: 2024,
    },
    {
        month: 3,
        day: 8,
        week: 10,
        weekday: 5,
        year: 2024,
    },
    {
        month: 3,
        day: 9,
        week: 10,
        weekday: 6,
        year: 2024,
    },
    {
        month: 3,
        day: 10,
        week: 10,
        weekday: 7,
        year: 2024,
    },
        {
        month: 3,
        day: 11,
        week: 11,
        weekday: 1,
        year: 2024,
    },
    {
        month: 3,
        day: 12,
        week: 11,
        weekday: 2,
        year: 2024,
    },
    {
        month: 3,
        day: 13,
        week: 11,
        weekday: 3,
        year: 2024,
    },
    {
        month: 3,
        day: 14,
        week: 11,
        weekday: 4,
        year: 2024,
    },
    {
        month: 3,
        day: 15,
        week: 11,
        weekday: 5,
        year: 2024,
    },
    {
        month: 3,
        day: 16,
        week: 11,
        weekday: 6,
        year: 2024,
    },
    {
        month: 3,
        day: 17,
        week: 11,
        weekday: 7,
        year: 2024,
    },
];

const seedDate = () => Day.bulkCreate(dateData);

module.exports = seedDate;