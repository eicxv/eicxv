import PreviewAlert from './preview-alert';

export default function Layout({ preview, children }) {
  return (
    <>
      {preview ? <PreviewAlert /> : null}
      {children}
    </>
  );
}
