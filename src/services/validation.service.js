class ValidationService {
    validateName = name => REGEXP.NAME.test(name);
    validateAlias = alias => REGEXP.ALIAS.test(alias);
    validateClub = club => REGEXP.CLUB.test(club);
}
