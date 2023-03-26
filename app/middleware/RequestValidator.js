const { check, validationResult } = require("express-validator");

exports.search = [

    check("search_key")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("Please provide the equation"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({
                status: "error",
                message: errors.array(),
                data: null
            });
        next();
    },
];