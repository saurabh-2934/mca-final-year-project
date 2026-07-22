import { useState, useEffect } from "react";
import Header from "./Header.home";
import Footer from "./Footer";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    gender: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/user/profile");

        setProfile({
          name: response.data.profile?.name || "",
          phone: response.data.profile?.phone || "",
          gender: response.data.profile?.gender || "",
          email: response.data.user.email,
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axiosInstance.put("/user/profile", {
        name: profile.name,
        phone: profile.phone,
        gender: profile.gender,
      });

      toast.success("Profile Updated Successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4 shadow">
        <Header />
      </div>

      {/* Main */}
      <main className="flex-1 px-4 md:px-32 pt-32 pb-12 flex justify-center">
        <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40 flex justify-center items-end">
            <div className="bg-white rounded-full p-2 translate-y-12 shadow-xl">
              <FaUserCircle className="text-[100px] text-blue-600" />
            </div>
          </div>

          {/* Form */}
          <div className="pt-16 px-8 pb-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-zinc-800">My Profile</h2>
                <p className="text-gray-500 mt-2">
                  Manage your personal information.
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <MdEdit className="text-xl" />
                  <span className="hidden md:inline">Edit Profile</span>
                </button>
              )}
            </div>

            <form onSubmit={onSubmit} className="space-y-7">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  placeholder=" "
                  className={`peer w-full border-2 rounded-lg px-4 pt-6 pb-2 outline-none transition ${
                    isEditing
                      ? "border-gray-300 bg-white focus:border-blue-600"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />

                <label
                  htmlFor="name"
                  className="absolute left-4 top-2 text-sm text-gray-500">
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  readOnly
                  placeholder=" "
                  className="w-full border-2 border-gray-200 bg-gray-100 rounded-lg px-4 pt-6 pb-2 cursor-not-allowed"
                />

                <label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-sm text-gray-500">
                  Email Address
                </label>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={profile.phone}
                  disabled={!isEditing}
                  maxLength={10}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                  placeholder=" "
                  className={`peer w-full border-2 rounded-lg px-4 pt-6 pb-2 outline-none transition ${
                    isEditing
                      ? "border-gray-300 bg-white focus:border-blue-600"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />

                <label
                  htmlFor="phone"
                  className="absolute left-4 top-2 text-sm text-gray-500">
                  Mobile Number
                </label>
              </div>

              {/* Gender */}
              <div>
                <label className="block font-semibold text-zinc-700 mb-3">
                  Gender
                </label>

                <div className="grid grid-cols-3 gap-4">
                  {["Male", "Female", "Other"].map((gender) => (
                    <label
                      key={gender}
                      className={`rounded-xl border-2 p-4 text-center transition ${
                        profile.gender === gender
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300"
                      } ${
                        isEditing
                          ? "cursor-pointer hover:border-blue-500"
                          : "cursor-not-allowed opacity-60"
                      }`}>
                      <input
                        type="radio"
                        value={gender}
                        disabled={!isEditing}
                        checked={profile.gender === gender}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            gender: e.target.value,
                          })
                        }
                        className="hidden"
                      />

                      <span className="font-medium">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition">
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border border-gray-300 hover:bg-gray-100 py-4 rounded-xl font-bold transition">
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
