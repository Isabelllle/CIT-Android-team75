package com.example.weconnectapp;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;

public class MyPair<F extends Serializable, S extends Serializable> implements Parcelable {
    public final F first;
    public final S second;

    public MyPair(F first, S second) {
        this.first = first;
        this.second = second;
    }

    protected MyPair(Parcel in) {
        first = (F) in.readSerializable();
        second = (S) in.readSerializable();
    }

    public static final Creator<MyPair> CREATOR = new Creator<MyPair>() {
        @Override
        public MyPair createFromParcel(Parcel in) {
            return new MyPair(in);
        }

        @Override
        public MyPair[] newArray(int size) {
            return new MyPair[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeSerializable(first);
        parcel.writeSerializable(second);
    }
}
