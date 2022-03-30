import {NotFound} from '../../error';
const testModel = require("../../models/testModel");

module.exports = async (req, res) => {
    const rows = await testModel.successModel();
    if (rows.length === 0) {
        throw new NotFound("사용자 정보 없음");
    }

    res.status(200).json({
        result: true,
        message: "응답 데이터.. (jwt 인증 불필요)",
        data: rows
    });
}