import PreviewAlert from './preview-alert';
import Header from './header';

export default function Layout({ preview, children }) {
  return (
    <>
      <Header />
      {preview ? <PreviewAlert /> : null}
      {children}
    </>
  );
}
