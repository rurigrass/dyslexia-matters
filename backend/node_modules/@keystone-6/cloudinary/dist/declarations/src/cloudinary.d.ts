/// <reference types="node" />
import fs from 'fs';
import cloudinary from 'cloudinary';
export declare type File = {
    id: string;
    filename: string;
    _meta: cloudinary.UploadApiResponse;
};
export declare type CloudinaryImageFormat = {
    prettyName?: string | null;
    width?: string | null;
    height?: string | null;
    crop?: string | null;
    aspect_ratio?: string | null;
    gravity?: string | null;
    zoom?: string | null;
    x?: string | null;
    y?: string | null;
    format?: string | null;
    fetch_format?: string | null;
    quality?: string | null;
    radius?: string | null;
    angle?: string | null;
    effect?: string | null;
    opacity?: string | null;
    border?: string | null;
    background?: string | null;
    overlay?: string | null;
    underlay?: string | null;
    default_image?: string | null;
    delay?: string | null;
    color?: string | null;
    color_space?: string | null;
    dpr?: string | null;
    page?: string | null;
    density?: string | null;
    flags?: string | null;
    transformation?: string | null;
};
export declare class CloudinaryAdapter {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
    folder?: string;
    constructor({ cloudName, apiKey, apiSecret, folder, }: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
        folder?: string;
    });
    /**
     * Params: { stream, filename, id }
     */
    save({ stream, filename, id }: {
        stream: fs.ReadStream;
        filename: string;
        id: string;
    }): Promise<{
        id: string;
        filename: string;
        _meta: cloudinary.UploadApiResponse;
    }>;
    /**
     * Deletes the given file from cloudinary
     * @param file File field data
     * @param options Delete options passed to cloudinary.
     *                For available options refer to the [Cloudinary destroy API](https://cloudinary.com/documentation/image_upload_api_reference#destroy_method).
     */
    delete(file?: File, options?: {}): Promise<unknown>;
    publicUrl(file?: File): string | null;
    publicUrlTransformed(file: File, options?: CloudinaryImageFormat): any;
}
