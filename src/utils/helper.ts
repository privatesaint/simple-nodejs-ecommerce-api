/**
 * @description: Return file name of image
 * @eg 'https://res.cloudinary.com/image/upload/v1676420972/product/ent1xynwaxjgbacxch7x.png'
 * @result ent1xynwaxjgbacxch7x.png
 */
export const getFileName = (img: string): string =>
  img.split("/").slice(-1).join("");
