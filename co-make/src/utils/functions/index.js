export const updatedUser = (user, formData) => {
  if (user.username === formData.user) {
    return {
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile_image_url: formData.profile_image_url,
    };
  }
  if (user.email === formData.email) {
    return {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile_image_url: formData.profile_image_url,
    };
  }
  if (user.username === formData.user && user.email === formData.email) {
    return {
      first_name: formData.first_name,
      last_name: formData.last_name,
      profile_image_url: formData.profile_image_url,
    };
  }
};

export const formatDate = (string) => {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};
