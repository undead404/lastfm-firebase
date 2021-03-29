import { Col, Image, Row } from 'antd';

import { Album } from '../misc/types';

export default function AlbumSelectItem({
  album,
}: {
  album: Album;
}): JSX.Element {
  return (
    <Row>
      <Col>
        <Row>
          {album.artist} - {album.name}
        </Row>
        <Row>{album.date}</Row>
      </Col>
      <Col>{album.thumbnail && <Image src={album.thumbnail} />}</Col>
    </Row>
  );
}
