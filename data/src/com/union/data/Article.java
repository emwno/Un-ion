package com.union.data;

/**
 * Created on Apr 2019.
 */
public class Article {

    private String objectId;
    private String title;
    private String link;
    private String thumbnail;
    private boolean isFakeNews;

    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public boolean isFakeNews() {
        return isFakeNews;
    }

    public void setFakeNews(boolean fakeNews) {
        isFakeNews = fakeNews;
    }
}
