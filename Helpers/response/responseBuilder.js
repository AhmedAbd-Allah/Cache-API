const httpStatusCodes = require('./responseCodes')

function sendResponse(status, error, data, res, message) {

    const responseCode = getResponseCode(status)
    const responseData = buildResponseObject(status, error, data, message)
    setResponseCode(res, responseCode)
    res.send(responseData)

}

function buildResponseObject(status, error, data, message) {
    return {
        status: status,
        message: message,
        data: error ? undefined : data,
        error: error ? error : undefined
    }
}

function getResponseCode(status) {
    return httpStatusCodes[status]
}

function setResponseCode(res, httpCode) {
    return res.status(httpCode)
}

module.exports = {
    sendResponse
}