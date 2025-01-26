const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;
console.log("Cloudinary URL:", url);

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mern_product"); // Corrected key name

        const dataResponse = await fetch(url, {
            method: "post",
            body: formData,
        });

        const data = await dataResponse.json();
        console.log("Cloudinary Response:", data);
        return data; // Ensure data is returned properly
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Rethrow error for debugging
    }
};

export default uploadImage;
