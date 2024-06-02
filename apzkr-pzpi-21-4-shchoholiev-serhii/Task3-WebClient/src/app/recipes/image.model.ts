export class Image {
    public id: string = '';
    public originalPhotoGuid: string = '';
    public smallPhotoGuid: string = '';
    public extension: string = '';
    public md5Hash: string = '';
    public imageUploadState: ImageUploadState = ImageUploadState.Started;
}

export enum ImageUploadState {
    Started,
    Uploaded,
    Failed
}