const inputIsInvalid = (input) => {
    return input.length.trim === "";
};

const emailIsInvalid = (input) => {
    return input.length.trim === "" || !input.includes("@");
};

export { inputIsInvalid, emailIsInvalid };
