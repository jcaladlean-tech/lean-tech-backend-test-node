-- Drops guitars table
DROP TABLE IF EXISTS simpleShipment;

-- Creates Shipment table simpleShipment
CREATE TABLE IF NOT EXISTS simpleShipment (
    _id SERIAL PRIMARY KEY,
    quoteRefId TEXT,
    "from" JSON,
    "to" JSON,
    products JSON,
    accessorials TEXT,
    instructionsShipper TEXT,
    instructionsConsignee TEXT,
    "references" TEXT
);