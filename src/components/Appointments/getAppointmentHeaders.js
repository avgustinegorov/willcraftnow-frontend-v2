import { t } from "@lingui/macro"

const getAppointmentHeaders = ({ appointment, count }) => {
  const singularOnly = count > 1

  switch (appointment.toUpperCase()) {
    case "EXECUTOR":
      return {
        headerText: singularOnly ? t`Executor` : t`Executor(s)`,
        subHeaderText: t`Appoint up to 4 Executors to carry out the instructions in your Will.`,
      }
    case "SUB_EXECUTOR":
      return {
        headerText: singularOnly
          ? t`Substitute Executor`
          : t`Substitute Executor(s)`,
        subHeaderText: t`Appoint a Substitute Executor in the event that one of your Executors is unable or unwilling to perform the role.`,
      }
    case "GUARDIAN":
      return {
        headerText: singularOnly ? t`Guardian` : t`Guardian`,
        subHeaderText: t`Guardians take care of your underaged child/children.`,
      }
    case "BENEFICIARY":
      return { headerText: singularOnly ? t`Beneficiary` : t`Beneficiary(s)` }
    case "WITNESS":
      return {
        headerText: singularOnly ? t`Witness` : t`Witness(es)`,
        subHeaderText: t`You are required by law to have two Witnesses.`,
      }
    case "DONEE":
      return {
        headerText: singularOnly ? t`Donee` : t`Donee(s)`,
        subHeaderText: t`Appoint up to 2 Donees.`,
      }
    case "REPLACEMENT_DONEE":
      return {
        headerText: t`Replacement Donee`,
        subHeaderText: t`Appoint a Substitute Donee in the event that one of your Donees is unable to perform the role.`,
      }
    case "CERTIFICATE_PROVIDER":
      return {
        headerText: t`Certificate Provider`,
        subHeaderText: t`Appoint a Certificate Provider.`,
      }
    default:
      throw new Error(`Appointment not found, ${appointment}`)
  }
}

export default getAppointmentHeaders

// const AppointmentAlerts = ({ persons, appointmentType }) => {
//   const [, i18n] = useTranslation()
//   switch (appointmentType) {
//     case "EXECUTOR":
//       if (persons.EXECUTOR.length === 0) {
//         return (
//           <PanelAlert
//             alertText={`${i18n.t(
//               "Executors are persons who will carry out your instructions after you've passed."
//             )} ${i18n.t(
//               "He must be <u>of sound mind</u>, and <u>above 21 years of age</u>."
//             )} ${i18n.t("It is required to have at least one.")}`}
//           />
//         )
//       } else if (
//         persons.EXECUTOR.length < 2 &&
//         persons.SUB_EXECUTOR.length === 0
//       ) {
//         return (
//           <PanelAlert
//             alertText={`${i18n.t(
//               "We <u>strongly recommend</u> appointing more than one executor, or a substitute executor in case your appointed executor refuses to act, or predeceases you."
//             )}`}
//           />
//         )
//       }
//       break
//     default:
//       break
//   }
//   return null
// }
