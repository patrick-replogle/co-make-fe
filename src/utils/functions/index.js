export const updatedUser = (user, formData) => {
    if (user.username === formData.username && user.email === formData.email) {
        return {
            first_name: formData.first_name,
            last_name: formData.last_name,
            city: formData.city,
            zip_code: formData.zip_code,
        };
    }
    if (user.username === formData.username && user.email !== formData.email) {
        return {
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            city: formData.city,
            zip_code: formData.zip_code,
        };
    }
    if (user.email === formData.email && user.username !== formData.username) {
        return {
            username: formData.username,
            first_name: formData.first_name,
            last_name: formData.last_name,
            city: formData.city,
            zip_code: formData.zip_code,
        };
    } else return formData;
};

export const formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
