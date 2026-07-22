const Location = require("../models/liveLocation.model");
const Address = require("../models/address.model");

const addAddress = async (req, res) => {
  try {
    const { id } = req.user;

    const {
      fullName,
      phone,
      pincode,
      locality,
      area,
      city,
      state,
      landmark,
      addressType,
      alternateNumber,
    } = req.body;

    const userAddress = await Address.findOne({
      user: id,
      locality,
      area,
      city,
      state,
      pincode,
    });

    if (userAddress) {
      return res
        .status(400)
        .json({ message: "Address allready exists. Try different" });
    }

    const response = await Address.create({
      user: id,
      fullName,
      phone,
      pincode,
      locality,
      area,
      city,
      state,
      landmark,
      addressType,
      alternateNumber,
    });

    res.status(201).json({ success: true, message: "Address added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAddresses = async (req, res) => {
  try {
    const { id } = req.user;

    const addresses = await Address.find({
      user: id,
    });

    res.status(200).json({ success: true, address: addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const setLiveLocation = async (req, res) => {
  try {
    const { id } = req.user;
    const { displayName } = req.body;

    const address = await Location.findOneAndUpdate(
      { user: id },
      { displayName },
      {
        new: true,
        upsert: true,
      },
    );

    return res.status(200).json({
      message: "Location saved successfully",
      address,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getLocation = async (req, res) => {
  try {
    const { id } = req.user;
    const location = await Location.findOne({ user: id });

    if (!location) {
      return res.status(400).json({ message: "location not set" });
    }

    return res.status(200).json({ location: location.displayName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await Address.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "address deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateIsDefault = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressId } = req.params;

    await Address.bulkWrite([
      {
        updateMany: {
          filter: { user: id },
          update: { $set: { isDefault: false } },
        },
      },
      {
        updateOne: {
          filter: { _id: addressId, user: id },
          update: { $set: { isDefault: true } },
        },
      },
    ]);
    res.status(200).json({ message: "address updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDefaultAddress = async (req, res) => {
  try {
    const { id } = req.user;

    const currentAddress = await Address.findOne({
      user: id,
      isDefault: true,
    });

    res.status(200).json({ currentAddress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  setLiveLocation,
  getLocation,
  addAddress,
  getAddresses,
  deleteAddress,
  updateIsDefault,
  getDefaultAddress,
};
