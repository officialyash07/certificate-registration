const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;

    const visiblePart = name.slice(0, Math.min(3, name.length));
    const hiddenPart = "*".repeat(Math.max(0, name.length - 3));
    return `${visiblePart}${hiddenPart}@${domain}`;
};

export { maskEmail };
