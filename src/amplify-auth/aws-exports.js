const awsConfig = {
    Auth: {
        Cognito: {
            region: import.meta.env.VITE_REGION,
            userPoolId: import.meta.env.VITE_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_WEB_CLIENT_ID,
            authenticationFlowType: "USER_SRP_AUTH",
        },
    },
};

export default awsConfig;
