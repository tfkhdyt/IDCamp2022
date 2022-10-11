const autoBind = require('auto-bind');

const AuthenticationError = require('../../exceptions/AuthenticationError');
const successResponse = require('../../utils/responses/success');
const NotFoundError = require('../../exceptions/NotFoundError');

class UserAlbumLikesHandler {
  constructor(userAlbumLikesService, albumsService) {
    this._userAlbumLikesService = userAlbumLikesService;
    this._albumsService = albumsService;

    autoBind(this);
  }

  async postUserAlbumLikeHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    if (!credentialId) {
      throw new AuthenticationError('Kredensial tidak valid');
    }

    await this._albumsService.getAlbumById(albumId);

    try {
      await this._userAlbumLikesService.checkLike(credentialId, albumId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        await this._userAlbumLikesService.addLike(credentialId, albumId);

        return successResponse(h, {
          message: 'Album berhasil disukai',
          statusCode: 201,
        });
      }
    }

    await this._userAlbumLikesService.deleteLike(credentialId, albumId);
    return successResponse(h, {
      message: 'Like berhasil dihapus',
      statusCode: 201,
    });
  }

  async getUserAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    let likes;

    try {
      likes = await this._userAlbumLikesService.getTotalLikesFromCache(albumId);
    } catch (error) {
      likes = await this._userAlbumLikesService.getTotalLikes(albumId);
      return successResponse(h, {
        data: { likes: parseInt(likes) },
      });
    }

    return successResponse(h, {
      data: { likes: parseInt(likes) },
      isCache: true,
    });
  }
}

module.exports = UserAlbumLikesHandler;
