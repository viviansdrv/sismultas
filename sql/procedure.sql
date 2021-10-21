USE testetrabalhomultas;

DELIMITER //
CREATE PROCEDURE atualizarpagmulta (
IN codigomulta INT
)

BEGIN 
	DECLARE qtdparcelas INT;
    
    SELECT parc_restantes INTO qtdparcelas FROM parc_multa
    WHERE cod_multa = codigomulta;
    
    IF qtdparcelas > 0 THEN
    UPDATE parc_multa SET parc_restantes = (parc_restantes - 1)
    WHERE cod_multa = codigomulta;
    ELSE 
    SELECT "MULTA JÁ FOI PAGA";
    END IF;
    
    SELECT parc_restantes INTO qtdparcelas FROM parc_multa
    WHERE cod_multa = codigomulta;
    IF qtdparcelas = 0 THEN
		UPDATE multa set pago = TRUE
        WHERE cod = codigomulta;
        END IF;
        END //