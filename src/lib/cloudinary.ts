import { randomUUID } from 'node:crypto';
import { v2 as cloudinary } from 'cloudinary';
import type { ProfileMediaKind } from './profile-media';

type UploadPostImageInput = {
  bytes: Buffer;
  mimeType: string;
  userId: string;
};

type UploadedPostImage = {
  imageUrl: string;
  imagePublicId: string;
};

type UploadProfileMediaInput = {
  bytes: Buffer;
  mimeType: string;
  userId: string;
  kind: ProfileMediaKind;
};

function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } = process.env;
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary is not configured.');
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
}

export async function uploadPostImage({ bytes, mimeType, userId }: UploadPostImageInput): Promise<UploadedPostImage> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: `twingface/posts/${userId}`,
      public_id: randomUUID(),
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      format: mimeType.split('/')[1],
      transformation: [{ width: 1600, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
    }, (error, result) => {
      if (error || !result || !result.public_id || !result.secure_url?.startsWith('https://')) {
        reject(new Error('Image upload failed.'));
        return;
      }
      resolve({ imageUrl: result.secure_url, imagePublicId: result.public_id });
    });
    stream.end(bytes);
  });
}

export async function uploadMarketplaceImage({ bytes, mimeType, sellerId }: { bytes: Buffer; mimeType: string; sellerId: string }): Promise<UploadedPostImage> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: `twingface/marketplace/${sellerId}`,
      public_id: randomUUID(),
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      format: mimeType.split('/')[1],
      transformation: [{ width: 1600, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
    }, (error, result) => {
      if (error || !result || !result.public_id || !result.secure_url?.startsWith('https://')) {
        reject(new Error('Image upload failed.'));
        return;
      }
      resolve({ imageUrl: result.secure_url, imagePublicId: result.public_id });
    });
    stream.end(bytes);
  });
}

export async function destroyPostImage(imagePublicId: string): Promise<void> {
  configureCloudinary();
  await cloudinary.uploader.destroy(imagePublicId, { resource_type: 'image', invalidate: true });
}

type PageMediaKind = 'avatar' | 'cover';

type UploadPageMediaInput = {
  bytes: Buffer;
  mimeType: string;
  pageId: string;
  kind: PageMediaKind;
};

export async function uploadPageMedia({ bytes, mimeType, pageId, kind }: UploadPageMediaInput): Promise<{ imageUrl: string }> {
  configureCloudinary();

  const transformation = kind === 'avatar'
    ? [{ width: 512, height: 512, crop: 'fill', quality: 'auto', fetch_format: 'auto' }]
    : [{ width: 1600, height: 640, crop: 'limit', quality: 'auto', fetch_format: 'auto' }];

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: `twingface/pages/${pageId}`,
      public_id: kind,
      overwrite: true,
      invalidate: true,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      format: mimeType.split('/')[1],
      transformation,
    }, (error, result) => {
      if (error || !result || !result.secure_url?.startsWith('https://')) {
        reject(new Error('Image upload failed.'));
        return;
      }
      resolve({ imageUrl: result.secure_url });
    });
    stream.end(bytes);
  });
}

export async function uploadPagePostImage({ bytes, mimeType, pageId }: { bytes: Buffer; mimeType: string; pageId: string }): Promise<{ imageUrl: string; imagePublicId: string }> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: `twingface/pages/${pageId}/posts`,
      public_id: randomUUID(),
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      format: mimeType.split('/')[1],
      transformation: [{ width: 1600, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
    }, (error, result) => {
      if (error || !result || !result.public_id || !result.secure_url?.startsWith('https://')) {
        reject(new Error('Image upload failed.'));
        return;
      }
      resolve({ imageUrl: result.secure_url, imagePublicId: result.public_id });
    });
    stream.end(bytes);
  });
}

export async function destroyPageMedia(pageId: string): Promise<void> {
  configureCloudinary();
  await cloudinary.api.delete_resources_by_prefix(`twingface/pages/${pageId}`, { invalidate: true });
}

export async function uploadProfileMedia({ bytes, mimeType, userId, kind }: UploadProfileMediaInput): Promise<{ imageUrl: string }> {
  configureCloudinary();

  const publicId = kind === 'profile' ? 'avatar' : 'cover';
  const transformation = kind === 'profile'
    ? [{ width: 512, height: 512, crop: 'fill', gravity: 'face', quality: 'auto', fetch_format: 'auto' }]
    : [{ width: 1600, height: 640, crop: 'limit', quality: 'auto', fetch_format: 'auto' }];

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: `twingface/profiles/${userId}`,
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      format: mimeType.split('/')[1],
      transformation,
    }, (error, result) => {
      if (error || !result || !result.secure_url?.startsWith('https://')) {
        reject(new Error('Image upload failed.'));
        return;
      }
      resolve({ imageUrl: result.secure_url });
    });
    stream.end(bytes);
  });
}
