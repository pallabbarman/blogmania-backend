/**
 * Password must be at least 8 characters long, have a mixture of uppercase and lowercase letters,
 * contain at least one number and at least one special character (!@#$%^?():',.=+[]<>{}-_/\*&;"`~|).
 */
export const validPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^?():',.=+\\[\]<>{}\-_\\/\\*&;"`~|])[A-Za-z\d!@#$%^?():',.=+\\[\]<>{}\-_\\/\\*&;"`~|]{8,}$/;
