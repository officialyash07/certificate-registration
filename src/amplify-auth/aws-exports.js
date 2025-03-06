const awsConfig = {
    Auth: {
        Cognito: {
            region: "region",
            userPoolId: "user-pool-id",
            userPoolClientId: "app-client-id",
        },
    },
};

console.log(awsConfig.Auth.Cognito);

export default awsConfig;
