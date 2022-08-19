import ThinFilm from '@eicxv/soap-film/src/visualization/thin-film-spectrum';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 2rem;
`;

export default function ThinFilmDemo() {
  return (
    <Container>
      <ThinFilm />
    </Container>
  );
}
