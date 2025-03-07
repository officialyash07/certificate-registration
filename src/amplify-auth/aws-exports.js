const awsConfig = {
    Auth: {
        Cognito: {
            region: import.meta.env.VITE_REGION,
            userPoolId: import.meta.env.VITE_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_WEB_CLIENT_ID,
        },
    },
};

export default awsConfig;
