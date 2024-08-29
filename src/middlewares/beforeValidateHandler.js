const { ValidationError } = require('sequelize');

/**
 * 모델 인스턴스 validation
 *
 * @param {Object} entity - 검증할 모델 인스턴스
 * @throws {ValidationError} 속성 규칙에 따라 필드 값이 유효하지 않은 경우 예외 발생
 */
function validateAttributes(entity) {
    for (const field in entity.rawAttributes) {
        const inputValue = entity[field];
        const column =  entity.rawAttributes[field];
        // 컬럼이 null을 허용하지 않고 입력받은 값이 비어있을 경우
        if (column.allowNull === false && !inputValue) {
            throw new ValidationError(`Validation error: ${column.comment}을(를) 입력해주세요.`);
        }
    }
}

/**
 * beforeValidate 핸들러 등록
 *
 * @param {Object} sequelize - Sequelize 인스턴스
 */
function registerBeforeValidateHook(sequelize) {
    sequelize.addHook('beforeValidate', (entity, options) => {
        validateAttributes(entity);
    });
}

module.exports = registerBeforeValidateHook;
