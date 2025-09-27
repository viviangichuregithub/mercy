"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function useApi(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAll = async () => {
    try {
      setLoading(true);
      const res = await api.get(endpoint);
      return res.data;
    } catch (err) {
      setError(err.response?.data || "Error fetching data");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    try {
      setLoading(true);
      const res = await api.post(endpoint, data);
      return res.data;
    } catch (err) {
      setError(err.response?.data || "Error creating record");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      await api.delete(`${endpoint}/${id}`);
    } catch (err) {
      setError(err.response?.data || "Error deleting record");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getAll, create, remove, loading, error };
}
