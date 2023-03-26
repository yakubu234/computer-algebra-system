const { matchedData } = require("express-validator");
const mathsteps = require('mathsteps');
const { getCache, setCache, removeCache, base64_encode } = require('./Caching')

async function search(req, res, next) {
    const equation = req.body.search_key;

    try {
        var result = await getCache(base64_encode(equation))

        if (!result) result = compute(equation);

        if (!result) {
            res.status(400).json({
                status: "error",
                message: "the equation is not properly formed",
                data: ''
            });
        }

        res.status(200).json({
            status: "success cache",
            message: "equation solved successfully",
            data: JSON.parse(result)
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "the equation is not properly formed",
            data: ''
        });

    }

}

function compute(equation) {
    try {
        const steps = mathsteps.solveEquation(equation);
        return steps;
        let ans = {};

        steps.forEach(step => {
            ans = {
                before_change: step.oldEquation.ascii(),
                change_type: step.changeType,
                after_change: step.newEquation.ascii(),
                number_of_substeps: step.substeps.length
            }

            if (step.substeps.length > 0) {
                step.substeps.forEach(step => {
                    ans = {
                        step_1: {
                            subset_before_change: step.oldEquation.ascii(),
                            subset_change: step.changeType,
                            subset_after_change: step.newEquation.ascii(),
                            subset__of_substeps: step.substeps.length
                        }
                    }

                    if (step.substeps.length > 0) {
                        step.substeps.forEach(step => {
                            ans = {
                                step_2: {
                                    subset_before_change: step.oldEquation.ascii(),
                                    subset_change: step.changeType,
                                    subset_after_change: step.newEquation.ascii(),
                                    subset__of_substeps: step.substeps.length
                                }
                            }
                        })

                    }
                })
            }
        });

        try {
            setCache(base64_encode(equation), ans);
            return ans;
        } catch (error) {
            return false;
        }

    } catch (error) {
        return false;
    }
}

module.exports = {
    search
}