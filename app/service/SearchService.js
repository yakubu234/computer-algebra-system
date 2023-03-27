const { matchedData } = require("express-validator");
const mathsteps = require('mathsteps');
const { getCache, setCache, removeCache, base64_encode } = require('./Caching')

async function search(req, res, next) {
    const equation = req.body.search_key;

    try {
        var result = await getCache(base64_encode(equation))

        if (!result) result = compute(equation);

        if (result) {
            res.status(200).json({
                status: "success",
                message: "equation solved successfully",
                data: parseJson(result)
            });
        }

        if (!result) {
            res.status(400).json({
                status: "error",
                message: "the equation is not properly formed",
                data: ''
            });
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "error",
            message: "the equation is not properly formed",
            data: ''
        });

    }

}

const parseJson = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str
    }
}

function compute(equation) {
    try {
        const steps = mathsteps.solveEquation(equation);
        var ans = {};

        steps.forEach((step, key) => {
            let row = "Step_" + (key + 1);
            ans[row] = {
                before_change: step.oldEquation.ascii(),
                change_type: step.changeType,
                after_change: step.newEquation.ascii(),
                number_of_substeps: step.substeps.length
            }

            if (step.substeps.length > 0) {
                step.substeps.forEach((step, key) => {
                    let row_1 = 'sub_step_' + (key + 1);
                    ans[row][row_1] = {
                        subset_before_change: step.oldEquation.ascii(),
                        subset_change: step.changeType,
                        subset_after_change: step.newEquation.ascii(),
                        subset__of_substeps: step.substeps.length
                    }

                    if (step.substeps.length > 0) {
                        step.substeps.forEach((step, key) => {
                            ans[row][row_1]['multi_sub_step_' + (key + 1)] = {
                                subset_before_change: step.oldEquation.ascii(),
                                subset_change: step.changeType,
                                subset_after_change: step.newEquation.ascii(),
                                subset__of_substeps: step.substeps.length
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