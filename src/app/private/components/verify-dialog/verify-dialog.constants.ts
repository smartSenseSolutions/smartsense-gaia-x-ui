export enum SignupStatus {
  Pending = 0,
  Started,
  DomainCreated,
  DomainCreationFailed,
  CertificateCreated,
  CertificateCreationFailed,
  IngressCreated,
  IngressCreationFailed,
  DIDJsonCreated,
  DIDJsonCreationFailed,
  ParticipantJsonCreated,
  ParticipantJsonCreationFailed,
  CertificateCreationInProgress,
}
export const FAILURE_STATUSES = [
  SignupStatus.DomainCreationFailed,
  SignupStatus.CertificateCreationFailed,
  SignupStatus.IngressCreationFailed,
  SignupStatus.DIDJsonCreationFailed,
  SignupStatus.ParticipantJsonCreationFailed,
];
