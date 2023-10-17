package com.example.weconnectapp;

import android.os.Parcel;
import android.os.Parcelable;

public class SerializablePair<F, S> implements Parcelable {
    public F first;
    public S second;

    public SerializablePair(F first, S second) {
        this.first = first;
        this.second = second;
    }

    protected SerializablePair(Parcel in) {

        first = (F) in.readString();
        second = (S) in.readParcelable(SerializableValue.class.getClassLoader());
    }

    public static final Creator<SerializablePair> CREATOR = new Creator<SerializablePair>() {
        @Override
        public SerializablePair createFromParcel(Parcel in) {
            return new SerializablePair(in);
        }

        @Override
        public SerializablePair[] newArray(int size) {
            return new SerializablePair[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString((String) first);
        parcel.writeParcelable((Parcelable) second, i);
    }
}
