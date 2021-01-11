import { expect } from 'chai'

import { isSomeDomainEmail, isSomeEmailValid, isUserEmail, isValidDomain } from './utils'

describe('isValidDomain', () => {
  it('returns true when domain includes email', () => {
    // Arrange
    const email = 'email@domain.com'
    const domain = 'domain.com'

    const expected = true

    // Actual
    const actual = isValidDomain(domain, email)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when domain is empty', () => {
    // Arrange
    const email = 'email@domain.com'
    const domain = ''

    const expected = false

    // Actual
    const actual = isValidDomain(domain, email)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when email is empty', () => {
    // Arrange
    const email = ''
    const domain = 'domain.com'

    const expected = false

    // Actual
    const actual = isValidDomain(domain, email)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when email not contains domain', () => {
    // Arrange
    const email = 'email'
    const domain = 'domain.com'

    const expected = false

    // Actual
    const actual = isValidDomain(domain, email)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when email equals domain name', () => {
    // Arrange
    const email = 'domain'
    const domain = 'domain'

    const expected = false

    // Actual
    const actual = isValidDomain(domain, email)

    // Assert
    expect(expected).equal(actual)
  })
})

describe('isSomeEmailValid', () => {
  it('returns true when emails not blocked, not included to allowed domains and allowed users are empty', () => {
    // Arrange
    const emails = ['user@email.com', 'myseconduser@mail.com']

    const allowedDomains = ['users.apply']
    const allowedUsers = []
    const blockedUsers = ['blocked@user.com']

    const expected = true

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('returns true when emails exists, not included to allowed domains, allowed and blocked users are empty', () => {
    // Arrange
    const emails = ['user@email.com', 'myseconduser@mail.com']

    const allowedDomains = ['users.apply']
    const allowedUsers = []
    const blockedUsers = []

    const expected = true

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return true when emails exists, but other data is empty', () => {
    // Arrange
    const emails = ['user@email.com', 'myseconduser@mail.com']

    const allowedDomains = []
    const allowedUsers = []
    const blockedUsers = []

    const expected = true

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return true when emails in not allowed users, but included to domains', () => {
    // Arrange
    const emails = ['email@x.com', 'email@y.com']

    const allowedDomains = ['x.com', 'c.com']
    const allowedUsers = ['l@com', 'x@com']
    const blockedUsers = ['email@r.com']

    const expected = true

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return true for real case of allowed user', () => {
    // Arrange
    const emails = ['username@gmail.com', 'best_username@mail.com']

    const allowedDomains = []
    const allowedUsers = ['username@gmail.com']
    const blockedUsers = ['bad_username@gmail.com']

    const expected = true

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return true for real case of allowed domains', () => {
    // Arrange
    const emails = ['username@gmail.com', 'best_username@mail.com']

    const allowedDomains = ['mail.com']
    const allowedUsers = ['username@gmail.com']
    const blockedUsers = ['bad_username@gmail.com']

    const expected = true

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return true for real case when no data provided', () => {
    // Arrange
    const emails = ['username@gmail.com', 'best_username@mail.com']

    const allowedDomains = []
    const allowedUsers = []
    const blockedUsers = []

    const expected = true

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false for real case when user in blocked list', () => {
    // Arrange
    const emails = ['username@gmail.com', 'best_username@mail.com']

    const allowedDomains = ['gmail.com']
    const allowedUsers = ['best_username@gmail.com']
    const blockedUsers = ['username@gmail.com']

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false for real case when user not in any category', () => {
    // Arrange
    const emails = ['username@gmail.com', 'best_username@mail.com']

    const allowedDomains = ['mails.com']
    const allowedUsers = ['best_username@mails.com']
    const blockedUsers = ['bad_username@mails.com']

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false when one of emails in blocked lists', () => {
    // Arrange
    const emails = ['email@x.com', 'email@y.com']

    const allowedDomains = []
    const allowedUsers = []
    const blockedUsers = ['email@y.com']

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false when one of emails in blocked lists and in allowed domains', () => {
    // Arrange
    const emails = ['email@x.com', 'email@y.com']

    const allowedDomains = ['y.com', 'x.com']
    const allowedUsers = []
    const blockedUsers = ['email@y.com']

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false when one of emails in blocked lists and in allowed domains and users', () => {
    // Arrange
    const emails = ['email@x.com', 'email@y.com']

    const allowedDomains = ['y.com', 'x.com']
    const allowedUsers = ['y.com', 'x.com']
    const blockedUsers = ['email@y.com']

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false when emails in not any category', () => {
    // Arrange
    const emails = ['email@x.com', 'email@y.com']

    const allowedDomains = ['r.com', 'c.com']
    const allowedUsers = ['y.com', 'x.com']
    const blockedUsers = ['email@y.com']

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false when one of emails in blocked lists and in allowed domains', () => {
    // Arrange
    const emails = ['email@x.com', 'email@y.com']

    const allowedDomains = ['y.com', 'x.com']
    const allowedUsers = []
    const blockedUsers = ['email@y.com']

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })

  it('return false when emails not exists', () => {
    // Arrange
    const emails = []

    const allowedDomains = []
    const allowedUsers = []
    const blockedUsers = []

    const expected = false

    // Actual
    const actual = isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })

    // Assert
    expect(expected).equal(actual)
  })
})

describe('isUserEmail', () => {
  it('returns true when user emails includes one of emails', () => {
    // Arrange
    const emails = [
      'email1@domain.com',
      'email2@domain.com',
      'email3@sitename.com',
      'email@do',
      'email@domein',
      'email',
    ]
    const userEmails = ['email@do']

    const expected = true

    // Actual
    const actual = isUserEmail(emails, userEmails)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns true when user emails includes all emails', () => {
    // Arrange
    const emails = [
      'email1@domain.com',
      'email2@domain.com',
      'email3@sitename.com',
      'email@do',
      'email@domein',
      'email',
    ]
    const userEmails = [
      'email1@domain.com',
      'email2@domain.com',
      'email3@sitename.com',
      'email@do',
      'email@domein',
      'email',
    ]

    const expected = true

    // Actual
    const actual = isUserEmail(emails, userEmails)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when user emails not contain one of emails', () => {
    // Arrange
    const emails = ['a@email.com', 'b@email.com', 'c@email.com']
    const userEmails = ['d@email.com', 'e@email.com']

    const expected = false

    // Actual
    const actual = isUserEmail(emails, userEmails)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when user emails are empty', () => {
    // Arrange
    const emails = [
      'email1@domain.com',
      'email2@domain.com',
      'email3@sitename.com',
      'email@do',
      'email@domein',
      'email',
    ]
    const userEmails = []

    const expected = false

    // Actual
    const actual = isUserEmail(emails, userEmails)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when emails are empty', () => {
    // Arrange
    const emails = []
    const userEmails = [
      'email1@domain.com',
      'email2@domain.com',
      'email3@sitename.com',
      'email@do',
      'email@domein',
      'email',
    ]

    const expected = false

    // Actual
    const actual = isUserEmail(emails, userEmails)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when user emails and emails are empty', () => {
    // Arrange
    const emails = []
    const userEmails = []

    const expected = false

    // Actual
    const actual = isUserEmail(emails, userEmails)

    // Assert
    expect(expected).equal(actual)
  })
})

describe('isSomeDomainEmail', () => {
  it('returns true when one of domains includes one of emails', () => {
    // Arrange
    const emails = [
      'email1@domain.com',
      'email2@domain.com',
      'email3@sitename.com',
      'email@do',
      'email@domein',
      'email',
    ]
    const domains = ['domain.com', 'sitename.com']

    const expected = true

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns true when one of domains includes emails', () => {
    // Arrange
    const emails = ['a@b.com', 'a@b.com', 'c@b.com']
    const domains = ['a.com', 'b.com']

    const expected = true

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns true when one domain and one email provided same domain', () => {
    // Arrange
    const emails = ['a@b.com']
    const domains = ['b.com']

    const expected = true

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when one domain and one email provided diffirent domain', () => {
    // Arrange
    const emails = ['a@c.com']
    const domains = ['b.com']

    const expected = false

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when emails not contain a domain', () => {
    // Arrange
    const emails = ['a@']
    const domains = ['b.com']

    const expected = false

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when emails not contain a domain and separator', () => {
    // Arrange
    const emails = ['a']
    const domains = ['b.com']

    const expected = false

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when domains not includes emails', () => {
    // Arrange
    const emails = ['a@x.com', 'b@y.com', 'c@z.com']
    const domains = ['a.com']

    const expected = false

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when domains are empty', () => {
    // Arrange
    const emails = ['email1@domain.com', 'email2@domain.com', 'email3@do.com', 'email@do', 'email@domein', 'email']
    const domains = []

    const expected = false

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when emails are empty', () => {
    // Arrange
    const emails = []
    const domains = ['domain', 'sitename']

    const expected = false

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })

  it('returns false when emails and domains are empty', () => {
    // Arrange
    const emails = []
    const domains = []

    const expected = false

    // Actual
    const actual = isSomeDomainEmail(emails, domains)

    // Assert
    expect(expected).equal(actual)
  })
})
