import fetch from 'node-fetch';


exports.handler = async (event, context) => {
  try {
    let isSolved = event.queryStringParameters.isSolved;
    let promptId = event.queryStringParameters.promptId;
    let promptHistory = event.queryStringParameters.promptHistory;
    let comment = event.queryStringParameters.comment;

    let solved = `entry.545240132=${ encodeURIComponent(isSolved) }`;
    let id = `&entry.702699373=${ encodeURIComponent(promptId) }`;
    let history = `&entry.1611392308=${ encodeURIComponent(promptHistory) }`;
    let msg = `&entry.1264050795=${ encodeURIComponent(comment) }`;

    let baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSe_aBVJCnwKum3lHKrs6G_UgyTu2qy1j-64yvp0X27jmBIyWA/formResponse?";
    let parameters = solved + id + history + msg;
    let url = baseUrl + parameters;

    fetch(url);
    console.log("feedback submitted")
    return {statusCode: 200};
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}

