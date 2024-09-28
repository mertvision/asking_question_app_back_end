/**
 * Function to generate a unique slug from a given text
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

export const generateUniqueSlug = async (text: string) => {
    // Convert the input text to lowercase
    const slug = text
        .toLowerCase()
        // Trim whitespace from both ends of the text
        .trim()
        // Replace spaces and non-word characters with '-'
        .replace(/[\s\W-]+/g, '-')
        // Remove leading and trailing '-' characters
        .replace(/^-+|-+$/g, '');

    // Generate a random number between 0 and 9999
    const uniqueNumber = Math.floor(Math.random() * 10000);

    // Concatenate the slug with the unique number
    return `${slug}-${uniqueNumber}`;
};
