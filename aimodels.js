async function googlegemini(message){
    const API_KEY = require('./config.json').api_key;
    const MODEL_NAME = "models/text-bison-001";
    
    const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
    const { GoogleAuth } = require("google-auth-library");

    const client = new TextServiceClient({
        authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });
  
    let result = await client.generateText({
        model: MODEL_NAME,
        prompt: {text: message},
    })

    try {
        // let output = JSON.stringify(result, null, 2);
        let response = await result[0].candidates[0].output;
        return response;
    } catch (error) {
        console.log(error);
        return "There was an error. Please contant the website owner.";
    }
}

module.exports = {googlegemini}