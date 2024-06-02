import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../recipes/image.model';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  private readonly imageStorageUrl = environment.imageStorageUrl;

  transform(value: Image, small: boolean = true, ...args: unknown[]): unknown {
    return `${this.imageStorageUrl}${small ? value.smallPhotoGuid : value.originalPhotoGuid}.${value.extension}`;
  }
}
