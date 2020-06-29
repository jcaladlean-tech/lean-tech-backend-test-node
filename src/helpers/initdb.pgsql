-- Drops tables
DROP TABLE IF EXISTS simpleShipment;
DROP TABLE IF EXISTS shipment;
DROP TABLE IF EXISTS carrier;

-- Creates simpleShipment table
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

-- Creates shipment table
CREATE TABLE IF NOT EXISTS shipment (
    id SERIAL PRIMARY KEY,
    carrierId INTEGER,
    date DATE,
    originCountry TEXT,
    originState TEXT,
    originCity TEXT,
    destinationCountry TEXT,
    destinationState TEXT,
    destinationCity TEXT,
    pickupdate DATE,
    deliveryDate DATE,
    status TEXT,
    carrierRate INTEGER
);

-- Creates carrier table
CREATE TABLE IF NOT EXISTS carrier (
    scac TEXT,
    id SERIAL PRIMARY KEY,
    name TEXT,
    mc INTEGER,
    dot INTEGER,
    fein TEXT
);