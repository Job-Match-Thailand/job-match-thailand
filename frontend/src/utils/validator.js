import i18n from 'i18next'
import moment from 'moment'
import Currency from '@/common/utils/currency.js'
/**
 * ! ข้อควรระวัง ค่าใน model ต้องเป็น string!!!
 * * Used:
 * * In template
    <v-text-field
      :rules="[$rules.required]"
    ></v-text-field>
 * * In script
 *  this.$rules.required
 */

export const rules = {
  required: value => !!value || i18n.t('error.required_no_field'),
  array_required: value =>
    (value !== null && (value === undefined || value.length > 0)) ||
    i18n.t('error.required_no_field'),
  required_zero_allow: value =>
    ((value || value === 0) && value !== '') ||
    i18n.t('error.required_no_field'),
  numeric: value => !isNaN(value) || i18n.t('error.numeric'),
  positive: value => Number(value) >= 0 || i18n.t('error.more_than_zero'),
  more_than_zero: value => Number(value) > 0 || i18n.t('error.more_than_zero'),
  not_zero: value => Number(value) !== 0 || i18n.t('error.not_zero'),
  empty_or_numeric: function (value) {
    if (value !== undefined && isNaN(value)) {
      return i18n.t('error.numeric')
    } else {
      return true
    }
  },
  empty_or_integer: function (value) {
    if (value === undefined || value === null || value === '') {
      return true
    } else if (Number(value) <= 0 || !Number.isInteger(Number(value))) {
      return i18n.t('error.empty_or_integer')
    }
    return true
  },
  alphanumeric: value =>
    /^[a-zA-Z0-9-.@_]*$/.test(value) || i18n.t('error.english_letter_or_digit'),
  letter_or_digit: function (value) {
    let format = /[ !@#$%^&*()_+=[\]{};':"\\|,.<>?]/
    if (format.test(value)) return i18n.t('error.letter_or_digit')
    else return true
  },
  upper_case_alphanumeric: value =>
    /^[A-Z0-9]*$/.test(value) || i18n.t('error.upper_case_alphabet'),
  integer: value =>
    Number.isInteger(Number(value)) || i18n.t('error.not_integer'),
  number_lte: n => value =>
    Number(value) <= n || i18n.t('error.number_lte', { n }),
  number_lt: n => value =>
    Number(value) < n || i18n.t('error.number_lt', { n }),
  number_gte: n => value =>
    Number(value) >= n || i18n.t('error.number_gte', { n }),
  number_gt: n => value =>
    Number(value) > n || i18n.t('error.number_gt', { n }),
  minlength: n => value =>
    value.length >= n || i18n.t('error.minlength', { n }),
  maxlength: n => value =>
    !value || value.length <= n || i18n.t('error.maxlength', { n }),
  is_date(value) {
    if (!value) return true

    let date = moment(value)
    if (!date.isValid()) {
      return i18n.t('error.invalid_date')
    }

    if (date.year() < 1900) {
      return i18n.t('error.invalid_date_before_1900')
    }

    return true
  },
  min_date(date) {
    return value =>
      moment(value).isSameOrAfter(date) || i18n.t('error.min_date', { date })
  },
  max_date(date) {
    return value =>
      moment(value).isSameOrBefore(date) || i18n.t('error.max_date', { date })
  },
  min_date_allow_empty(date) {
    return value => {
      if (moment(value).isSameOrAfter(date) || !value) return true
      else return i18n.t('error.min_date', { date })
    }
  },
  max_date_allow_empty(date) {
    return value => {
      if (moment(value).isSameOrBefore(date) || !value) return true
      else return i18n.t('error.max_date', { date })
    }
  },
  is_time(value) {
    if (!value) return true
    const regex = /(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])/
    return regex.test(value) || i18n.t('invalid_time')
  },
  max_time(max) {
    return value => {
      const [max_hour, max_minute] = max.split(':')
      const [value_hour, value_minute] = value.split(':')
      const max_dt = moment().set({ hour: max_hour, minute: max_minute })
      const value_dt = moment().set({ hour: value_hour, minute: value_minute })
      return (
        value_dt.isSameOrBefore(max_dt) ||
        i18n.t('error.max_date', { date: max })
      )
    }
  },
  is_datetime(value) {
    if (!value) return true
    return (
      moment(value, 'YYYY-MM-DD - HH:mm').isValid() ||
      i18n.t('error.invalid_datetime')
    )
  },
  email: value => !value || /.+@.+\..+/.test(value) || i18n.t('error.email'),
  validateUrlRule(value) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    if (pattern.test(value)) {
      return true
    }
    return i18n.t('line_crm.errors.wrong_url')
  },
  numberic_or_operator: value =>
    !value || /^[0-9.()%+*/-]+$/.test(value) || 'รูปแบบไม่สามารถคำนวนได้',
  valid_mobile: value =>
    !value ||
    /^0(6|8|9|2|3|4|5|7)\d{7,8}$/.test(value) ||
    i18n.t('error.mobile_phone_not_valid'),
}
